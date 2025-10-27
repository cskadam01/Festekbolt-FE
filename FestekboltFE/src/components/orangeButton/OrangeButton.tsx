
export const OrangeButton =({ button_text }: { button_text: string })=> {
    return(
        <>
            <button 
                style={{backgroundColor: '#ffb06c', 
                color: 'white', 
                padding: '10px 20px', 
                border: 'none',
                }}
                >
                    
                {button_text}
                
             </button>
        </>
    )


}