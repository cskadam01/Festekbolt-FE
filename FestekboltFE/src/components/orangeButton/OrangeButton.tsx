
export const OrangeButton =({ button_text }: { button_text: string })=> {
    return(
        <>
            <button 
                style={{backgroundColor: '#ff9e49ff', 
                color: 'white', 
                padding: '10px 20px', 
                border: 'none',
                textAlign:"center"
                }}
                >
                    
                {button_text}
                
             </button>
        </>
    )


}