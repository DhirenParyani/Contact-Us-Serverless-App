    import React, { useState } from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },

    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Form = () => {

    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [message, setMessage] = useState('');
    const [messageError, setMessageError] = useState('');


    const classes = useStyles();


    const validate = () => {
        let isError = false;


        if (name.length < 3) {
            isError = true;
            setNameError("Name needs to be atleast 4 characters long");
        }

        if (email.indexOf("@") === -1) {
            isError = true;
            setEmailError("Requires valid email");
        }


        return isError;
    };

    const onSubmit = e => {
        e.preventDefault();
        const err = validate();
        if (!err) {
            var data = {
                name: name,
                email: email,
                desc: message
            };
            console.log(data);

            fetch('https://asa9mf77ag.execute-api.us-east-1.amazonaws.com/prod/contact-us', {
                method: 'POST',
                body: JSON.stringify(data),
                dataType: "json",
                crossDomain: "true",
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }).then(res => {
                if (res.status !== 200) {
                    throw new Error('Failed');
                }
                return res.json();
            }).then(resData => {
                alert('successful!');
                setName('');
                setEmail('');
                setMessage('');
                setNameError('');
                setEmailError('');


            }).catch(err => {
                console.log(err);
                alert('unsuccessful!')
            });



        }
    };


    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <form className={classes.form}>
                    <TextField
                        name="name"
                        label="Name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        helperText={nameError}

                    />
                    <br />
                    <TextField
                        name="email"
                        label="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        helperText={emailError}

                    />
                    <br />
                    <TextField
                        name="message"
                        label="Message"
                        multiline
                        rows="3"
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        helperText={messageError}

                    />

                    <br />

                    <Button className={classes.submit} onClick={e => onSubmit(e)} variant="contained" color="primary" >Submit</Button>

                </form>
            </div>
        </Container>
    );

}

export default Form;