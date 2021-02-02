import React, { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
// import { db } from '../firebase';

export default function UpdateProfile () {
  const emailRef = useRef();
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const firstNameRef = useRef()
  const lastNameRef = useRef()
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { currentUser, updateEmail, updatePassword, dbUser, updateUser } = useAuth();
  const history = useHistory();

  console.log('dbUser', dbUser)
  function handleSubmit (e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }
    const promises = []
    setLoading(true);
    setError('');

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value))
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value))
    }
    updateUser(firstNameRef.current.value, lastNameRef.current.value)

    Promise.all(promises).then(() => {
      history.push('/dashboard')
    }).catch(() => {
      setError('Failed to update account')
    }).finally(() => {
      setLoading(false)
    })

  }
// does this go here on on the auth contexts to be called above?
// var user = firebase.auth().currentUser;
// user.updateProfile({
//   firstName: firstNameRef.current.value,
//   lastName: lastNameRef.current.value,
//   email:emailRef.current.value,
//   password: passwordRef.current.value,
// }).then(function() {
//   // Update successful.
// }).catch(function(error) {
//   // An error happened.
// });



  return (
		<>
			<div className='centerme'>
				<div>SignBee Logo</div>
				<br />
				<br />
				<div className='formdiv'>
					<h2>SIGNBEE</h2>
					{error && <div>{error}</div>}
					<form className='veritcalform' onSubmit={handleSubmit}>
						<label htmlFor='firstName'>First Name</label>
						<br />
						<input
              type='text'
              ref={firstNameRef}
              defaultValue={dbUser && dbUser.firstName}
						/>
						<br />
						<label htmlFor='lastName'>Last Name</label>
						<br />
						<input
              type='text'
              ref={lastNameRef}
              defaultValue={dbUser && dbUser.lastName}
						/>
						<br />
						<label htmlFor='email'>Email</label>
						<br />
						<input
							type='email'
							ref={emailRef}
							required
							defaultValue={currentUser.email}
						/>
						<br />
						<label htmlFor='password'>Password</label>
						<br />
						<input
							type='password'
							ref={passwordRef}
							placeholder='Leave blank to keep the same'
						/>
						<br />
						<label htmlFor='confirmPassword'>Confirm Password</label>
						<br />
						<input
							type='password'
							ref={passwordConfirmRef}
							placeholder='Leave blank to keep the same'
						/>
						<br />
						<br />
						<Button
							variant='contained'
							color='primary'
							type='submit'
							disabled={loading}
						>
							Update Profile
						</Button>
					</form>
					<br />
					<div>
						<a href='/'>
							<Button variant='contained' color='primary'>
								Back
							</Button>
						</a>
					</div>
				</div>
			</div>
		</>
	);
}
