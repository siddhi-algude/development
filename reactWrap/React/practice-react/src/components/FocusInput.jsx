// useref hook demo
import { useRef ,useState,useEffect} from "react";
function FocusInput (){
    const inputRef = useRef(null);
    const widthRef = useRef(0);
    const [width, setWidth] = useState(0);
    console.log('Component rendered'); 
    useEffect(()=>{
        if(!inputRef.current)return;
        widthRef.current = inputRef.current.getBoundingClientRect().width;
        setWidth(Math.round(widthRef.current)+12);

    },[]);

    function handleFocus(){ 
        inputRef.current?.focus();
    }
    return (
        <div>
            <h3>Focus n measure an input</h3>
            <input
                ref={inputRef}
                placeholder = "Click 'focus input' "
                style = {{padding:8,width:280}}
            />
            <div style={{marginTop:8}}>
                <button onClick={handleFocus}>Focus input</button>
            </div>
            <p style ={{marginTop:8}}>
                Cached width from dom 
            </p>
        </div>
    )
}
export default FocusInput;

