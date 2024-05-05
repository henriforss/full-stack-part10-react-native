import { useFormik } from "formik";
import { StyleSheet, TextInput, View, Pressable } from "react-native";
import * as yup from "yup";
import theme from "../theme";
import Text from "./Text";
import useReview from "../hooks/useReview";
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
  ownerName: yup.string().required("Repository owner name is required"),
  repositoryName: yup.string().required("Repository name is required"),
  rating: yup
    .number()
    .typeError("Rating must be a number")
    .min(0, "Rating must be at least 0")
    .max(100, "Rating must be at most 100")
    .required("Rating is required"),
  review: yup.string(),
});

const ReviewForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      ownerName: "",
      repositoryName: "",
      rating: "",
      review: "",
    },
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, formik.errors.ownerName && styles.inputError]}
        placeholder="Repository owner name"
        value={formik.values.ownerName}
        onChangeText={formik.handleChange("ownerName")}
      />

      {formik.touched.ownerName && formik.errors.ownerName && (
        <Text color={"textError"} style={styles.error}>
          {formik.errors.ownerName}
        </Text>
      )}

      <TextInput
        style={[
          styles.input,
          formik.errors.repositoryName && styles.inputError,
        ]}
        placeholder="Repository name"
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange("repositoryName")}
      />

      {formik.touched.repositoryName && formik.errors.repositoryName && (
        <Text color={"textError"} style={styles.error}>
          {formik.errors.repositoryName}
        </Text>
      )}

      <TextInput
        style={[styles.input, formik.errors.rating && styles.inputError]}
        placeholder="Rating between 0 and 100"
        value={formik.values.rating}
        onChangeText={formik.handleChange("rating")}
      />

      {formik.touched.rating && formik.errors.rating && (
        <Text color={"textError"} style={styles.error}>
          {formik.errors.rating}
        </Text>
      )}

      <TextInput
        style={styles.input}
        placeholder="Review"
        value={formik.values.review}
        onChangeText={formik.handleChange("review")}
        multiline
      />

      <Pressable onPress={formik.handleSubmit} style={styles.button}>
        <Text
          fontSize={"subheading"}
          fontWeight={"bold"}
          color={"textSecondary"}
        >
          Create a review
        </Text>
      </Pressable>
    </View>
  );
};

const CreateReview = () => {
  const [reviewThis] = useReview();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, review } = values;

    try {
      const { data } = await reviewThis({
        ownerName,
        repositoryName,
        rating: parseInt(rating),
        text: review,
      });

      navigate(`/${data.createReview.repositoryId}`);
    } catch (e) {
      console.log("Error:", e);
    }
  };

  return <ReviewForm onSubmit={onSubmit} />;
};

export default CreateReview;
