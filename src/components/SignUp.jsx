import { useFormik } from "formik";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import * as yup from "yup";
import theme from "../theme";
import Text from "./Text";
import { useNavigate } from "react-router-native";
import useSignUp from "../hooks/useSignUp";
import useSignIn from "../hooks/useSignIn";

const styles = StyleSheet.create({
  container: {
    flex: "auto",
    backgroundColor: "white",
    padding: 10,
    flexGrow: 0,
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  inputError: {
    borderColor: theme.colors.error,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
    display: "flex",
    alignItems: "center",
  },
  error: {
    marginBottom: 10,
  },
});

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, "Username should be between 5-30 characters")
    .max(30, "Username should be between 5-30 characters")
    .required("Username is required"),
  password: yup
    .string()
    .min(5, "Password should be between 5-50 characters")
    .max(50, "Password should be between 5-50 characters")
    .required("Password is required"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Password confirmation is required"),
});

export const SignUpForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      passwordConfirmation: "",
    },
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, formik.errors.username && styles.inputError]}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
      />

      {formik.touched.username && formik.errors.username && (
        <Text color={"textError"} style={styles.error}>
          {formik.errors.username}
        </Text>
      )}

      <TextInput
        style={[styles.input, formik.errors.password && styles.inputError]}
        placeholder="Password"
        secureTextEntry
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
      />

      {formik.touched.password && formik.errors.password && (
        <Text color={"textError"} style={styles.error}>
          {formik.errors.password}
        </Text>
      )}

      <TextInput
        style={[styles.input, formik.errors.password && styles.inputError]}
        placeholder="Password confirmation"
        secureTextEntry
        value={formik.values.passwordConfirmation}
        onChangeText={formik.handleChange("passwordConfirmation")}
      />

      {formik.touched.passwordConfirmation &&
        formik.errors.passwordConfirmation && (
          <Text color={"textError"} style={styles.error}>
            {formik.errors.passwordConfirmation}
          </Text>
        )}

      <Pressable onPress={formik.handleSubmit} style={styles.button}>
        <Text
          fontSize={"subheading"}
          fontWeight={"bold"}
          color={"textSecondary"}
        >
          Sign up
        </Text>
      </Pressable>
    </View>
  );
};

const SignUp = () => {
  const [signUp] = useSignUp();
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password, passwordConfirmation } = values;

    try {
      const { data } = await signUp({ username, password });

      if (data.createUser) {
        const { data } = await signIn({ username, password });
        navigate("/");
      }
    } catch (e) {
      console.log("Error:", e);
    }
  };

  return <SignUpForm onSubmit={onSubmit} />;
};

export default SignUp;
