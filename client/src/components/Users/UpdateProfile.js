import React, { useState, Fragment, useCallback } from "react";
import { Link, useHistory } from "react-router-dom";
import Form, {
  ErrorMessage,
  Field,
  FormHeader,
  FormFooter,
  ValidMessage,
  HelperMessage,
} from "@atlaskit/form";
import TextField from "@atlaskit/textfield";
import Button from "@atlaskit/button";
import ButtonGroup from "@atlaskit/button/button-group";
import LoadingButton from "@atlaskit/button/loading-button";
import { useAuth } from "../../contexts/AuthContext";
import Modal, {
  ContainerComponentProps,
  ModalTransition,
} from "@atlaskit/modal-dialog";
import { update } from "lodash";

const UpdateProfile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);
  const open = () => setIsOpen(true);
  const [name, setName] = useState("");
  const { currentUser, updateEmail, updatePassword } = useAuth();
  const history = useHistory();

  const handleSubmit = (e, data) => {
    e.preventDefault();
    updateEmail(data.email);
    updatePassword(data.password);
  };

  const CustomContainer = useCallback((ContainerComponentProps) => {
    <Form onSubmit={handleSubmit}>
      {({ formProps, submitting }) => (
        <form {...formProps}>
          {/* <FormHeader title="Sign Up" /> */}
          <Field name="email" label="Email" isRequired defaultValue="">
            {({ fieldProps, error }) => (
              <Fragment>
                <TextField autoComplete="off" {...fieldProps} />
                {error && (
                  <ErrorMessage>
                    This email is already in use, try another one.
                  </ErrorMessage>
                )}
              </Fragment>
            )}
          </Field>
          <Field
            name="password"
            label="Password"
            defaultValue=""
            isRequired
            validate={(value) =>
              value && value.length < 8
                ? "Your password length needs to be at least 8 characters."
                : undefined
            }
          >
            {({ fieldProps, error, valid, meta }) => {
              return (
                <Fragment>
                  <TextField type="password" {...fieldProps} />
                  {error && !valid && (
                    <HelperMessage>
                      Use 8 or more characters with a mix of letters, numbers &
                      symbols.
                    </HelperMessage>
                  )}
                  {error && (
                    <ErrorMessage>
                      Password needs to be more than 8 characters.
                    </ErrorMessage>
                  )}
                  {valid && meta.dirty ? (
                    <ValidMessage>Awesome password!</ValidMessage>
                  ) : null}
                </Fragment>
              );
            }}
          </Field>
        </form>
      )}
    </Form>;
  }, []);

  // const handleClick = (e) => {
  //   props.onClick();
  // };

  return (
    <>
      <Button appearance="link" spacing="compact" onClick={open}>
        Update Details
      </Button>

      <ModalTransition>
        {isOpen && (
          <Modal
            actions={[
              { text: "Update", type: "submit" },
              { text: "Cancel", onClick: close },
            ]}
            components={{
              Container: CustomContainer,
            }}
            onClose={close}
            heading="Update your details"
          >
            {/* <Field
              name="email"
              label="Email"
              isRequired
              defaultValue={currentUser.email}
            >
              {({ fieldProps, error }) => (
                <Fragment>
                  <TextField autoComplete="off" {...fieldProps} />
                  {error && (
                    <ErrorMessage>
                      This email is already in use, try another one.
                    </ErrorMessage>
                  )}
                </Fragment>
              )}
            </Field>
            <Field
              name="password"
              label="Password"
              placeholder="Leave blank to keep the same"
              validate={(value) =>
                value && value.length < 8
                  ? "Your password length needs to be at least 8 characters."
                  : undefined
              }
            >
              {({ fieldProps, error, valid, meta }) => {
                return (
                  <Fragment>
                    <TextField type="password" {...fieldProps} />
                    {error && !valid && (
                      <HelperMessage>
                        Use 8 or more characters with a mix of letters, numbers
                        & symbols.
                      </HelperMessage>
                    )}
                    {error && (
                      <ErrorMessage>
                        Password needs to be more than 8 characters.
                      </ErrorMessage>
                    )}
                    {valid && meta.dirty ? (
                      <ValidMessage>Awesome password!</ValidMessage>
                    ) : null}
                  </Fragment>
                );
              }}
            </Field> */}
          </Modal>
        )}
      </ModalTransition>
    </>
  );

  // const handleSubmit = (data) => {

  //   const handleUpdate = () => {if (data.email !== currentUser.email) {handleUpdate.push(update(data.email))}

  //   if (data.password !== currentUser.password) {handleUpdate.push(updatePassword(data.password))}
  //   // console.log("data: ", data);
  //   // signup(data.email, data.password);
  //   // history.push("/user/login");
  // };

  // const CustomContainer = useCallback((containerProps) => {
  //   return (
  //     <div
  //       style={{
  //         display: "flex",
  //         width: "400px",
  //         maxWidth: "100%",
  //         margin: "0 auto",
  //         flexDirection: "column",
  //       }}
  //     >
  //       <Form onSubmit={handleSubmit}>
  //         {({ formProps, submitting }) => (
  //           <form {...containerProps.formProps}>
  //             <FormHeader title="Update Profile" />
  //             <Field
  //               name="email"
  //               label="Email"
  //               isRequired
  //               defaultValue={currentUser.email}
  //             >
  //               {({ fieldProps, error }) => (
  //                 <Fragment>
  //                   <TextField autoComplete="off" {...fieldProps} />
  //                   {error && (
  //                     <ErrorMessage>
  //                       This email is already in use, try another one.
  //                     </ErrorMessage>
  //                   )}
  //                 </Fragment>
  //               )}
  //             </Field>
  //             <Field
  //               name="password"
  //               label="Password"
  //               placeholder="Leave blank to keep the same"
  //               validate={(value) =>
  //                 value && value.length < 8
  //                   ? "Your password length needs to be at least 8 characters."
  //                   : undefined
  //               }
  //             >
  //               {({ fieldProps, error, valid, meta }) => {
  //                 return (
  //                   <Fragment>
  //                     <TextField
  //                       type="password"
  //                       {...containerProps.fieldProps}
  //                     />
  //                     {error && !valid && (
  //                       <HelperMessage>
  //                         Use 8 or more characters with a mix of letters,
  //                         numbers & symbols.
  //                       </HelperMessage>
  //                     )}
  //                     {error && (
  //                       <ErrorMessage>
  //                         Password needs to be more than 8 characters.
  //                       </ErrorMessage>
  //                     )}
  //                     {valid && meta.dirty ? (
  //                       <ValidMessage>Awesome password!</ValidMessage>
  //                     ) : null}
  //                   </Fragment>
  //                 );
  //               }}
  //             </Field>
  //             <FormFooter>
  //               <ButtonGroup>
  //                 <Button appearance="subtle-link">
  //                   <Link to="/user/login">Have an account? Sign in here.</Link>
  //                 </Button>
  //                 <Button appearance="subtle">Cancel</Button>
  //                 <LoadingButton
  //                   type="submit"
  //                   appearance="primary"
  //                   isLoading={submitting}
  //                 >
  //                   Sign Up
  //                 </LoadingButton>
  //               </ButtonGroup>
  //             </FormFooter>
  //           </form>
  //         )}
  //       </Form>
  //     </div>
  //   );
  // });
};

export { UpdateProfile };

// const UserProfileCard = () => {
//   return (
//     <div className="">
//       <div className="">
//         <div
//           style={{
//             background: `url(https://res.cloudinary.com/dqcsk8rsc/image/upload/v1577268053/avatar-1-bitmoji_upgwhc.png)`,
//             backgroundSize: "",
//             height: "200px",
//             width: "200px",
//           }}
//           className=""
//         ></div>
//         <div className="">
//           <h2 className="text-2xl font-semibold">Wilbur</h2>
//           <h3 className="italic">hello@wilbur.com</h3>
//         </div>
//       </div>
//       <button className="">Sign out</button>
//     </div>
//   );
// };
// export { UserProfileCard };

// ------------

// const UpdateProfile = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const close = () => setIsOpen(false);
//   const open = () => setIsOpen(true);
//   const [name, setName] = useState("");
//   const { currentUser, updateEmail, updatePassword } = useAuth();
//   const history = useHistory();
// const containerProps = ContainerComponentProps;

// const handleClick = (e) => {
//   props.onClick();
// };

// return (
//   <>
//     <Button appearance="link" spacing="compact" onClick={open}>
//       Update Details
//     </Button>

//     <ModalTransition>
//       {isOpen && (
//         <Modal
//           actions={[
//             { text: "Update", type: "submit" },
//             { text: "Cancel", onClick: close },
//           ]}
//           onClose={close}
//           heading="Update your details"
//         ></Modal>
//       )}
//     </ModalTransition>
//   </>
// );
