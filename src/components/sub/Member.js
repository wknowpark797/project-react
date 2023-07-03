import Layout from '../common/Layout';
import { useState, useEffect } from 'react';

function Member() {
	const initVal = {
		userid: '',
		pwd1: '',
		pwd2: '',
		email: '',
		gender: false,
		interests: false,
	};
	const [Val, setVal] = useState(initVal);
	const [Err, setErr] = useState({});
	const [Submit, setSubmit] = useState(false);

	const handleChange = (e) => {
		// 현재 입력하고 있는 input 요소의 name, value 값을 비구조화할당으로 뽑아서 출력
		const { name, value } = e.target;
		// 기존의 초기의 Val state값을 deep copy하여 현재 입력하고 있는 항목의 name값과 value값으로 기존 state를 덮어쓰기 하여 변경 (불변성 유지)
		setVal({ ...Val, [name]: value });
	};

	const handleRadio = (e) => {
		const { name, checked } = e.target;
		setVal({ ...Val, [name]: checked });
	};

	const handleCheck = (e) => {
		const { name } = e.target;
		let isChecked = false;
		const inputs = e.target.parentElement.querySelectorAll('input');

		// 모든 체크박스를 반복하면서 하나라도 체크되어 있다면 true값 반환
		inputs.forEach((el) => el.checked && (isChecked = true));
		setVal({ ...Val, [name]: isChecked });
	};

	const check = (value) => {
		// 인수로 현재 Val state값을 전달받아 항목별로 에러 메시지를 객체로 반환하는 함수
		// 반환되는 에러 메세지가 있으면 인증실패 반환되는 에러 메세지가 없으면 인증성공
		const errors = {};
		const eng = /[a-zA-Z]/;
		const num = /[0-9]/;
		const spc = /[~!@#$%^&*()_+]/;

		if (value.userid.length < 5) {
			errors.userid = '아이디를 5글자 이상 입력하세요.';
		}
		if (value.pwd1.length < 5 || !eng.test(value.pwd1) || !num.test(value.pwd1) || !spc.test(value.pwd1)) {
			errors.pwd1 = '비밀번호는 5글자 이상, 영문, 숫자, 특수문자를 모두 포함하세요.';
		}
		if (value.pwd1 !== value.pwd2 || !value.pwd2) {
			errors.pwd2 = '두개의 비밀번호를 동일하게 입력하세요.';
		}
		if (value.email.length < 8 || !/@/.test(value.email)) {
			errors.email = '이메일 주소는 8글자 이상 @를 포함하세요.';
		}
		if (!value.gender) {
			errors.gender = '성별을 체크해주세요.';
		}
		if (!value.interests) {
			errors.interests = '관심사를 하나이상 선택하세요.';
		}

		return errors;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('현재 state값: ', Val);
		// check 함수가 반환하는 메세지가 있으면 해당 메세지를 화면에 출력하고 전송중지 반환하는 메세지가 없으면 인증성공
		console.log(check(Val));
		setErr(check(Val));
		setSubmit(true);
	};

	useEffect(() => {
		// 객체의 키값을 배열로 반환한 다음 해당 배열의 개수를 저장
		// length값이 0이라면 Err객체에 에러 메세지가 없으므로 인증통과 처리
		const len = Object.keys(Err).length;
		if (len === 0 && Submit) alert('모든 인증을 통과하였습니다.');
	}, [Err]);

	return (
		<Layout name={'Member'}>
			<form onSubmit={handleSubmit}>
				<fieldset>
					<legend className='h'>회원가입 Form 양식</legend>
					<table>
						<tbody>
							{/* user id */}
							<tr>
								<th scope='row'>
									<label htmlFor='userid'>USER ID</label>
								</th>
								<td>
									<input type='text' name='userid' id='userid' placeholder='아이디를 입력하세요.' onChange={handleChange} value={Val.userid} />
									<br />
									{Err.userid && <p>{Err.userid}</p>}
								</td>
							</tr>

							{/* password */}
							<tr>
								<th>
									<label htmlFor='pwd1'>PASSWORD</label>
								</th>
								<td>
									<input type='password' name='pwd1' id='pwd1' placeholder='비밀번호를 입력하세요.' onChange={handleChange} value={Val.pwd1} />
									<br />
									{Err.pwd1 && <p>{Err.pwd1}</p>}
								</td>
							</tr>
							<tr>
								<th>
									<label htmlFor='pwd2'>RE-PASSWORD</label>
								</th>
								<td>
									<input type='password' name='pwd2' id='pwd2' placeholder='비밀번호를 재입력하세요.' onChange={handleChange} value={Val.pwd2} />
									<br />
									{Err.pwd2 && <p>{Err.pwd2}</p>}
								</td>
							</tr>

							{/* email */}
							<tr>
								<th>
									<label htmlFor='email'>EMAIL</label>
								</th>
								<td>
									<input type='text' name='email' id='email' placeholder='이메일 주소를 입력하세요.' onChange={handleChange} value={Val.email} />
									<br />
									{Err.email && <p>{Err.email}</p>}
								</td>
							</tr>

							{/* gender */}
							<tr>
								<th>GENDER</th>
								<td>
									<label htmlFor='male'>Male</label>
									<input type='radio' name='gender' value='male' id='male' onChange={handleRadio} />

									<label htmlFor='female'>FeMale</label>
									<input type='radio' name='gender' value='female' id='female' onChange={handleRadio} />

									<br />
									{Err.gender && <p>{Err.gender}</p>}
								</td>
							</tr>

							{/* interest */}
							<tr>
								<th>INTERESTS</th>
								<td>
									<label htmlFor='music'>Music</label>
									<input type='checkbox' name='interests' value='music' id='music' onChange={handleCheck} />

									<label htmlFor='reading'>Reading</label>
									<input type='checkbox' name='interests' value='reading' id='reading' onChange={handleCheck} />

									<label htmlFor='game'>Game</label>
									<input type='checkbox' name='interests' value='game' id='game' onChange={handleCheck} />

									<br />
									{Err.interests && <p>{Err.interests}</p>}
								</td>
							</tr>

							{/* btn set */}
							<tr>
								<th colSpan='2'>
									<input type='reset' value='RESET' onClick={() => setVal(initVal)} />
									<input type='submit' value='SEND' />
								</th>
							</tr>
						</tbody>
					</table>
				</fieldset>
			</form>
		</Layout>
	);
}

export default Member;
