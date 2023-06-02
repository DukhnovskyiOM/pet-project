import { useState } from 'react';
import './formCountDesk.css'
import Desk from './Desk';

const FormCountDesk = () => {
    const numDesk = 9
    const [nDesk, setNDesk] = useState(numDesk)
    const [nVDesk, setNVDesk] = useState(0)
    const [check, setCheck] = useState(false)

    function onDesk (e){
        setNVDesk(e)
        setNDesk(e)
        setCheck(true)
    }
    function offDesk (){
        setNDesk(numDesk)
        setCheck(false)
    }

    return (
        <div className="form_choice">
            <h1>Choice number of tables</h1>
            {check ? 
                <div>Your choice of {nVDesk} desk</div> : 
                <div className="desk">
                        {[...Array(nDesk)].map((n, i) =>
                    <Desk 
                    key={i}
                    onClick={() => onDesk(numDesk - i)}
                    />
                    )}
                </div>
          }
          
          <button onClick={() => offDesk()}>Reset</button>
          <button>Next step</button>
          
      </div>
    )
}
export default FormCountDesk;