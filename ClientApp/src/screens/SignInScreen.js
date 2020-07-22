import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

const SignInScreen = (props) => {
    return (
        <div>
            <Form>
                <FormGroup>
                    <Label for="Email">Email</Label>
                    <Input type="email" name="email" id="emailSignIn" />
                </FormGroup>
                <FormGroup>
                    <Label for="Password">Password</Label>
                    <Input type="password" name="password" id="pwSignIn" />
                </FormGroup>
                <Button>Sign In</Button>
            </Form>
            <a style={styles.createAccount} href="/">Create an account</a>
        </div>

    );
}

let styles = {
    createAccount: {
        color: 'black',
        fontSize: '14px',
    }
}
export default SignInScreen;

