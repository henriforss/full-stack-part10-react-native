import { useFormik } from "formik";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import * as yup from "yup";
import theme from "../theme";
import Text from "./Text";
import useSignIn from "../hooks/useSignIn";
import { useNavigate } from "react-router-native";

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
    .min(4, "Username should be between 4-8 characters")
    .max(8, "Username should be between 4-8 characters")
    .required("Username is required"),
  password: yup
    .string()
    .min(4, "Password should be between 4-8 characters")
    .max(8, "Password should be between 4-8 characters")
    .required("Password is required"),
});

const SignInForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
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

      <Pressable onPress={formik.handleSubmit} style={styles.button}>
        <Text
          fontSize={"subheading"}
          fontWeight={"bold"}
          color={"textSecondary"}
        >
          Sign in
        </Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });
      navigate("/");
    } catch (e) {
      console.log("Error:", e);
    }
  };

  return <SignInForm onSubmit={onSubmit} />;
};

export default SignIn;
