function limiter($campo, $option = {}){
    // {$min = '', $max = ''}

    if($option.$min !== ''){
        if($campo.length <= $option.$min){
            return false;
        }
    }


    if($option.$max !== ''){
        console.log($campo.length);
        if($campo.length >= $option.$max){
           
            return false;

        }
    }

    return true;
}

export default async function ValidaForms($data = []){

    let error = [];

    if(!$data){
        error.push('Falha ao validar campos!');
    }

    const numberCamps = $data.length;


    for(var i = 0; i < numberCamps; i++){
        const {$campo, $nomeCampo, $rules} = $data[i];

        if($rules){
            if($rules.required === true)
            {
                // Valida String
                if($rules.type === String){

                    if($campo === 'undefined' || $campo === '' || $campo === null || $campo.length === 0){
                        error.push(`O campo ${$nomeCampo} não deve ficar em branco!`);
                    }

                    // Verifica a quantidade minima de Caracteres da String
                    if($rules.min){

                        
                        if(!limiter($campo, {$min : $rules.min})){
                            error.push(`O campo ${$nomeCampo} não deve ter menos de ${$rules.min} letras.`);
                        }
                    }

                    // Verifica a quantidade maxima de Caracteres da String
                    if($rules.max){

                        
                        if(!limiter($campo, {$max : $rules.max})){
                            error.push(`O campo ${$nomeCampo} não deve ter mais de ${$rules.max} letras.`);
                        }
                    }    
                    
                }

                
                if($rules.type === Boolean){
                    if($campo === false){
                        error.push(`O campo ${$nomeCampo} não pode ficar desmarcado!`);
                    }
                }
            }
        }


    }

    // [
    //     {$campo, $nomeCampo, $rules}
    // ]

    // $rules = {
    //     min: Number,
    //     max: Number,
    //     type: Boolean & String & Number & Email,
    //     required : Boolean // True or False
    // }


    // Retorno
    if(error.length === 0){
        return false;
    }else{
        return error;
    }

}