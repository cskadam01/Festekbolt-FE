




export const OrangeButton =({ button_text, onClick, disabled }: { button_text: string, onClick: ()=> void, disabled?:boolean })=> {
    return(
        <>
            <button
                onClick={onClick} 
                disabled={disabled}
                style={{backgroundColor: '#ff9e49ff', 
                color: 'white', 
                padding: '10px 20px', 
                border: 'none',
                textAlign:"center",
                cursor: disabled ? "not-allowed" : "pointer",
                }}
                >
                    
                {button_text}
                
             </button>
        </>
    )


}