import { Box, Button, Flex, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { Formik, Form, FormikHelpers } from "formik";
import InputField from "./InputField";
import { LoginInput } from "../../utils/type";
import { useLogIn } from "../../helper/_api";

const TestForm = () => {
  const initialValues: LoginInput = { email: "", password: "" };

  const handleLogin = async (
    value: LoginInput,
    { setErrors }: FormikHelpers<LoginInput>
  ) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const test = await useLogIn(value);
    console.log(test);
  };
  return (
    <Box textAlign={`center`} width={`50%`} margin={`auto`}>
      <Formik initialValues={initialValues} onSubmit={handleLogin}>
        {({ isSubmitting }) => (
          <Form autoComplete="off">
            <InputField
              name="email"
              placeholder="Email"
              label="Email"
              type="text"
            />

            <Box mt={4}>
              <InputField
                name="password"
                placeholder="Password"
                label="Pass Word"
                type="password"
              />
            </Box>

            <Flex mt={2}>
              <NextLink href="/forgot-password">
                <Link ml="auto">Forgot Password</Link>
              </NextLink>
            </Flex>

            <Button
              type="submit"
              colorScheme="teal"
              mt={4}
              isLoading={isSubmitting}
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default TestForm;
