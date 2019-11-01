export default function Validator($dados = []){

    // $campo / $nomedoCampo
    // $campo = {campo / nomeCampo}

    let err = [];


    if($dados.length === 0){
        err.push('Campo invalido!')
    }

    const qtdCampos = $dados.length;

    for(let i = 0; i < qtdCampos; i++){

        let {campo, campoName, rules} = $dados[i];

        
        // Valida String
        if(rules.type === String){
            
            if(isEmpty(campo)){
                err.push(`O campo ${campoName} não pode ficar em branco!`)
            }

            if(rules.min){
                if(minLength(campo, rules.min)){
                    err.push(`O campo ${campoName} não pode ter menos de ${rules.min} caracteres!`)
                }
            }

            if(rules.max){
                if(maxLength(campo, rules.max)){
                    err.push(`O campo ${campoName} não pode ter max de ${rules.max} caracteres!`)
                }
            }
        }

        // Valida Booleanos
        if(rules.type === Boolean){
            if(campo === false){
                err.push(`O campo ${campoName} não pode ficar desmarcado!`);
            }
        }
    }


    if(err.length === 0){
        return false;
    }else{
        return err;
    }

}

function isEmpty(campo = ''){
    if(campo === null || campo === 'undefined' || campo === '' || typeof(campo) === 'undefined' || campo === null){
        return true;
    }

    return false;
}

function minLength(campo = '', limiter){
    if(campo.length < limiter){
        return true;
    }

    return false;
}

function maxLength(campo = '', limiter){
    if(campo.length > limiter){
        return true;
    }

    return false;
}