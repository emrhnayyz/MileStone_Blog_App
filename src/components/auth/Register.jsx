import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import LockIcon from "@mui/icons-material/Lock";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import { Box, Button, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import { InputAdornment } from '@mui/material'


import * as Yup from "yup";
import useAuthCall from "../../hooks/useAuthCall";
import { useRef } from "react";

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .min(4, "Too Short!")
    .max(150, "Too Long!")
    .required("username required"),
  first_name: Yup.string().max(100, "Too Long!").required("Required"),
  last_name: Yup.string().max(100, "Too Long!").required("Required"),
  email: Yup.string().email("Invalid email").required("Email required"),
  password: Yup.string()
    .min(8, "En az 8 karakter uzunluğunda olması lazım")
    .max(50, "Too Long!")
    .matches(/\d+/, "Password bir sayı içermelidir")
    .matches(/[a-z]/, "Password bir küçük harf içermelidir")
    .matches(/[A-Z]/, "Password bir büyük harf içermelidir")
    .matches(/[!,?{}><%&$#£+-.]+/, "Password bir özel karakter içermelidir") //regex
    .required("Required"),
  password2: Yup.string()
    .oneOf([Yup.ref("password")], "Password aynı olmak zorundadır!")
    .required("Required"),
});

const Register = () => {
  const fileInputRef = useRef(null);
  const register = useAuthCall()

  return (
    <Container maxWidth="lg">
      <Grid
        container
        justifyContent="center"
        direction="row-reverse"
        rowSpacing={{ sm: 3 }}
        sx={{
          height: "100vh",
          p: 2,
        }}>


        <Grid item xs={12} sm={10} md={6}>
          <Avatar
            sx={{
              backgroundColor: "secondary.light",
              m: "auto",
              width: 40,
              height: 40,
            }}>
            <LockIcon size="30" />
          </Avatar>
          <Typography
            variant="h4"
            align="center"
            mb={2}
            color="secondary.light">
            Sign Up
          </Typography>
          <Formik
            initialValues={{
              username: "",
              first_name: "",
              last_name: "",
              email: "",
              bio: "",
              image: "",
              password: "",
              password2: "",
            }}
            validationSchema={SignupSchema}
            onSubmit={(values, actions) => {
              //! submit işlemi gerçekleştiğinde yapmasını istediğimiz işlemleri buraya yazıyoruz.
              console.log(values);
              register(values, actions);
              actions.resetForm();// inputları boşaltmak için kullanıyroruz
            }}>
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <Form>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <TextField
                    id="username"
                    label="User Name *"
                    type="text"
                    variant="outlined"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.username && errors.username}
                    error={!!(touched.username && errors.username)}
                  />

                  <TextField
                    id="email"
                    label="Email Address *"
                    type="email"
                    variant="outlined"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.email && errors.email}
                    error={!!(touched.email && errors.email)}
                  />

                  <TextField
                    id="image"
                    label="Image"
                    type="text"
                    variant="outlined"
                    name="image"
                    value={values.image}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  <TextField
                    id="bio"
                    label="Bio"
                    type="text"
                    variant="outlined"
                    name="bio"
                    value={values.bio}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  <TextField
                    id="password"
                    label="Password*"
                    type="password"
                    variant="outlined"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.password && errors.password}
                    error={!!(touched.password && errors.password)}
                  />

                  <TextField
                    id="password2"
                    label="Confirm Password*"
                    type="password"
                    variant="outlined"
                    name="password2"
                    value={values.password2}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={touched.password2 && errors.password2}
                    error={!!(touched.password2 && errors.password2)}
                  />

                  <Button type="submit" variant="contained" size="large">Submit</Button>
                </Box>
              </Form>
            )}
          </Formik>

          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Link to="/login">Do you have an account?</Link>
          </Box>
        </Grid>


      </Grid>
    </Container>
  );
};

export default Register;
