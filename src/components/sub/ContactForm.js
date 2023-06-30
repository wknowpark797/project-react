import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

function ContactForm() {
	const form = useRef(null);
	const inputName = useRef(null);
	const inputEmail = useRef(null);
	const inputMessage = useRef(null);
	const [Success, setSuccess] = useState(false);

	const serviceId = 'service_9gz6979';
	const templateId = 'template_p22mw5k';
	const publicKey = 'jupOkSJY9CbSbfcLR';

	// Form 메일 전송 함수
	const sendEmail = (e) => {
		e.preventDefault();

		emailjs.sendForm(serviceId, templateId, form.current, publicKey).then(
			(result) => {
				// 전송 성공
				console.log(result.text);
				setSuccess(true);
				inputName.current.value = '';
				inputEmail.current.value = '';
				inputMessage.current.value = '';
			},
			// 전송 실패
			(error) => {
				console.log(error.text);
				setSuccess(false);
			}
		);
	};

	return (
		<div id='form-contact'>
			<form ref={form} onSubmit={sendEmail}>
				<label>Name</label>
				<input type='text' name='username' ref={inputName} />

				<label>Email</label>
				<input type='email' name='email}' ref={inputEmail} />

				<label>Message</label>
				<textarea name='message' ref={inputMessage} />

				<input type='submit' value='Send' />
			</form>

			{Success && <p>메일이 성공적으로 발송되었습니다.</p>}
		</div>
	);
}

export default ContactForm;
