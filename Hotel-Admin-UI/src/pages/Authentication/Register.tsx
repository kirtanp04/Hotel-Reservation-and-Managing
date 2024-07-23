import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Divider,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { CommonPath } from "src/Router/path";
import { FaviconIcon } from "src/assets/iconify";
import FormProvider from "src/components/Form/FormProvider";
import FormTextField from "src/components/Form/FormTextField";
import Page from "src/components/Page";
import showMessage from "src/util/ShowMessage";
import * as yup from "yup";
import { Auth, _Register } from "./AuthMgr";
import { NavLink } from "react-router-dom";

const registerSchema = yup.object().shape({
  _id: yup.string(),
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Email must be a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
  // profileImg: yup.string().url("Profile image must be a valid URL"),
  phone: yup
    .string()
    .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),
  role: yup
    .mixed<"guest" | "admin">()
    .oneOf(["guest", "admin"], 'Role must be either "guest" or "admin"')
    .required("Role is required"),
  createdAt: yup.date().default(() => new Date()),
});

export default function Register() {
  const _Method = useForm<_Register>({
    defaultValues: new _Register(),
    resolver: yupResolver(registerSchema) as any,
  });
  const theme = useTheme();

  const OnSignup = (objRegister: _Register) => {
    Auth.Register(
      objRegister,
      (res) => {
        showMessage(res, theme, () => {});
      },
      (err) => {
        showMessage(err, theme, () => {});
      }
    );
  };

  const { handleSubmit } = _Method;
  return (
    <Page title="Sign up">
      <RootStyle>
        <ContentWrapper>
          <Box
            padding={"24px"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            width={"100%"}
            height={"100%"}
            flexDirection={"column"}
          >
            <Row>
              <FaviconIcon
                height={25}
                width={25}
                IconColor={theme.themeColor}
              />
              <Typography
                marginLeft={"10px"}
                textTransform={"uppercase"}
                fontSize={"1.5rem"}
              >
                Quick Stay
              </Typography>
            </Row>

            <SignUpTextWrapper>
              <SignUpText>Sign up</SignUpText>
              <SubTitle>Enter your credentials to continue</SubTitle>
            </SignUpTextWrapper>
            <FormProvider
              methods={_Method}
              onSubmit={handleSubmit(OnSignup)}
              sx={{ width: "100%" }}
            >
              <FieldWrapper>
                <InputWrapper>
                  <FormTextField
                    name="name"
                    label="Name"
                    fullWidth
                    variant="outlined"
                  />

                  <FormTextField
                    name="phone"
                    label="Phone"
                    fullWidth
                    variant="outlined"
                  />
                </InputWrapper>
                <InputWrapper>
                  <FormTextField
                    name="email"
                    label="Email"
                    fullWidth
                    variant="outlined"
                    type="email"
                  />
                </InputWrapper>

                <InputWrapper>
                  <FormTextField
                    name="password"
                    label="Password"
                    fullWidth
                    variant="outlined"
                    type="password"
                  />
                </InputWrapper>

                <InputWrapper>
                  <FormTextField
                    name="confirmPassword"
                    label="Confirm Password"
                    fullWidth
                    variant="outlined"
                  />
                </InputWrapper>
              </FieldWrapper>
              <Button
                variant="outlined"
                type="submit"
                sx={{ width: "100%", marginTop: "2rem" }}
              >
                Sign Up
              </Button>
            </FormProvider>
            <Divider sx={{ margin: "20px 0px" }} flexItem />

            <Row>
              <Text sx={{ fontSize: "1rem" }} to={""}>
                Already have an account ?
              </Text>
              <Text
                sx={{
                  fontSize: "1rem",
                  marginLeft: "0.6rem",
                  color: theme.themeColor,
                  cursor: "pointer",
                }}
                to={CommonPath.login}
              >
                Sign In
              </Text>
            </Row>
          </Box>
        </ContentWrapper>
        <Footer>
          <FooterContent>
            <Text to={""}>Kirtanp04 Portfolio</Text>
            <Text to={""}>Quick Stay</Text>
          </FooterContent>
        </Footer>
      </RootStyle>
    </Page>
  );
}

const RootStyle = styled(Box)(({ theme }) => ({
  height: "100vh",
  width: "100%",
  backgroundColor: theme.palette.background.default,
  display: "flex",
  flexDirection: "column",
}));

const FieldWrapper = styled(Box)(() => ({
  width: "100%",
  padding: "0.8rem",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  marginTop: "2rem",
  gap: "0.5rem",
}));

const InputWrapper = styled(Box)(({ theme }) => ({
  width: "100%",
  display: "flex",
  alignItems: "center",
  gap: "1rem",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

const Row = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
}));

const ContentWrapper = styled(Box)(() => ({
  boxSizing: "border-box",
  display: "flex",
  flexFlow: "wrap",
  width: "30%",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "calc(100vh - 70px)",
  margin: "auto",
}));

const Footer = styled(Box)(() => ({
  boxSizing: "border-box",
  width: "100%",
  padding: "0px 5rem 2rem 5rem",
}));

const FooterContent = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  width: "100%",
}));

const Text = styled(NavLink)(({ theme }) => ({
  fontSize: "0.75rem",
  fontWeight: 400,
  color: theme.palette.text.secondary,
  fontFamily: "Roboto, sans-serif",
  lineHeight: 1.57,
  cursor: "pointer",
}));

const SignUpTextWrapper = styled(Typography)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  width: "100%",
  alignItems: "center",
  marginTop: "2.5rem",
}));

const SignUpText = styled(Typography)(({ theme }) => ({
  fontSize: "1.25rem",
  fontWeight: 600,
  fontFamily: "Roboto, sans-serif",
  lineHeight: 1.167,
  color: theme.themeColor,
}));

const SubTitle = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  fontWeight: 600,
  fontFamily: "Roboto, sans-serif",
  lineHeight: 1.167,
  color: theme.palette.text.secondary,
  marginTop: "8px",
  textAlign: "center",
}));