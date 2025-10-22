import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface PasswordPadProps{
    passwordLength?:number;
    complete:(password:string) => void;
    errorMsg?:string;
    isLoading?:boolean;
    reset?:boolean;
}
const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

const passPad = ():(number | string)[]    => {
    const numberPad: (number | string)[] = [...NUMBERS];
    numberPad.splice(numberPad.length - 1, 0, 'blank');
    numberPad.splice(numberPad.length, 0, 'delete');
    return numberPad;  
}  

export default function PasswordPad({passwordLength = 6,
  errorMsg,
  complete,
  isLoading = false,
  reset = false
}:PasswordPadProps) {
    const [input, setInput] = useState<string>('');  
    const [numbers] = useState<(number | string)[]>(passPad());
    const [isComplete, setIsComplete] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
      if(reset){
          setInput('');
          setIsComplete(false);
      }
    },[reset])

    const onClickPad = (value: number)=> {
      if (passwordLength > input.length) {
        const newInput = input + value;
        setInput(newInput);

        if (passwordLength === newInput.length) {
          complete(newInput);
          setIsComplete(true);
        }
      }
    };

    const onClickDelete = () => {
      setInput((prev) => prev.slice(0, -1));
    };

    const onClickBack = () => {
      setInput('');
      setIsComplete(false);
      navigate("/");
    };

  return (
    <div id="passwordPad">
      <div className="inner">
        <div className="heading">
          <button
            disabled={isComplete || isLoading}
            className="return-button"
            onClick={onClickBack}
            aria-label="뒤로가기"
          >
            <span className="blind">뒤로가기</span>
          </button>
        </div>

        <div className="indicator-wrap">
          <h2 className="title">Please enter your passcode</h2>
          <div className="row-item">
            {[...Array(passwordLength)].map((_, index) => (
              <div
                key={index}
                className={`dot ${input.length > index ? 'active' : ''}`}
              />
            ))}
          </div>
          {errorMsg && <span className="error">{errorMsg}</span>}
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
                    disabled={isComplete || isLoading}
                    className="button-delete"
                    onClick={onClickDelete}
                  >
                    <span className="blind">삭제</span>
                  </button>
                );
              } else {
                return (
                  <button
                    key={index}
                    disabled={isComplete || isLoading}
                    className="button-pad"
                    onClick={() => onClickPad(item as number)}
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
  )
}
