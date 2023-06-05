import { useState } from 'react';
import './formCountDesk.css'
import Desk from './Desk';
import DeskSet from './DeskSet';

const FormCountDesk = () => {
    const numDesk = 9
    const [nDesk, setNDesk] = useState(numDesk)
    const [nVDesk, setNVDesk] = useState(0)
    const [check, setCheck] = useState(false)

    function onDesk (e: number){
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
            <h1>Step 1: Choice number of tables</h1>
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

          {check && <>
          <h1>Step 2: Individual setting (number of seats)</h1>
          <div className="desk__set">
                        {[...Array(nVDesk)].map((n, i) =>
                    <DeskSet
                    key={i}
                     />
                    )}
                </div>
          </>
          }
          
      </div>
    )
}
export default FormCountDesk;