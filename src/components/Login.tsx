import React from "react";
import { Form, Input, Button, message } from "antd";
import { connect, ConnectedProps } from "react-redux";
import { AppDispatch, RootState } from "../common/store";
import { loginThunk } from "../reducers/userSlice";

type FormData = {
  email: string;
  password: string;
};

const mapStateToProps = (state: RootState) => {
  return {
    ...state.user,
  };
};
const connector = connect(mapStateToProps);

type LoginFormProps = ConnectedProps<typeof connector> & {
  dispatch: AppDispatch;
  onSuccess: () => void;
};
class LoginForm extends React.Component<LoginFormProps> {
  handleSubmit = async (values: FormData) => {
    const { dispatch } = this.props;
    dispatch(loginThunk(values.email, values.password));
  };
  componentDidUpdate(previousProps: LoginFormProps) {
    const { state, onSuccess, error } = this.props;
    if (previousProps.state !== state && state === "success") {
      onSuccess();
    }
    if (previousProps.state !== state && state === "error") {
      message.error(error);
    }
    if (previousProps.state !== state && state === "success") {
      message.success("Login Successful!");
    }
  }
  render() {
    const { state } = this.props;
    return (
      <Form
        noValidate
        layout="vertical"
        name="basic"
        onFinish={this.handleSubmit}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
        >
          <Input type="email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button
            loading={state === "loading"}
            type="primary"
            htmlType="submit"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

// Named exports let the user of this module
// rename the import explicitly rather than implicitly
const WrappedLoginForm = connector(LoginForm);
export { WrappedLoginForm as LoginForm };
