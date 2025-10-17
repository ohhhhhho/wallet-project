import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/view/setPassword.scss';
import { ensryptUserData } from '../utils/crypto';
import { v4 as uuidv4 } from 'uuid';


const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

interface PasswordInputProps {
  passwordLength?: number;
  message?: string;
}

export default function PasswordInput({
  passwordLength = 6,
  message = '비밀번호를 입력해주세요',
}: PasswordInputProps) {
  const navigate = useNavigate();

  const passPad = ():(number | string)[]    => {
    const numberPad: (number | string)[] = [...NUMBERS];
    numberPad.splice(numberPad.length - 1, 0, 'blank');
    numberPad.splice(numberPad.length, 0, 'delete');
    return numberPad;  
  }  

  const [input, setInput] = useState<string>('');  
  const [numbers] = useState<(number | string)[]>(passPad());
  const [isComplete, setIsComplete] = useState<boolean>(false);

  const onPressPad = (value: number): void => {
    if (passwordLength > input.length) {
      const newInput = input + value;
      setInput(newInput);
      if (passwordLength === newInput.length) {
        setIsComplete(true);
        const userInfo = ensryptUserData({
          id: uuidv4(),
          password: input,
          mnemonic: '',
          publicKey: '',
          privateKey: '',
          address: '',
          createdAt: new Date().toISOString(),
        });
        localStorage.setItem('wallet_data', JSON.stringify(userInfo));
        navigate('/wallet');
      }
    }
  };

  const onPressReturn = (): void => {
    navigate("/");
  };

  const onPressDelete = (): void => {
    setInput((prev) => prev.slice(0, -1));
  };

  return (
    <div id='SetPassword'>
      <div className="inner">
        <div className="header">
          <button
            disabled={isComplete}
            className="return-button"
            onClick={onPressReturn}
            aria-label="뒤로가기"
          >
            <span className="blind">뒤로가기</span>
          </button>
        </div>

        <div className="indicator-wrap">
          <h2 className="title">{message}</h2>
          <div className="row-item">
            {[...Array(passwordLength)].map((_, index) => (
              <div
                key={index}
                className={`dot ${input.length > index ? 'active' : ''}`}
              />
            ))}
          </div>
        </div>

        <div className="numberpad-wrap">
          <div className="grid">
            {numbers.map((item, index) => {
              if (item === 'blank') {
                return <div key={index} className="blank" />;
              } else if (item === 'delete') {
                return (
                  <button
                    key={index}
                    disabled={isComplete}
                    className="delete-button"
                    onClick={onPressDelete}
                  >
                    ⌫
                  </button>
                );
              } else {
                return (
                  <button
                    key={index}
                    disabled={isComplete}
                    className="pad-button"
                    onClick={() => onPressPad(item as number)}
                  >
                    {item}
                  </button>
                );
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
