export default function ValidaForms(campo,campoName, option = {}){

    var erro = [];


    if(option.type){
        if(option.type == Boolean){
            if(campo !== true){
                console.log(campo)
                erro.push({
                    messege: `O ${campoName} não pode ficar desmarcado.`
                })
            }
        }

    }else{


        if(!campo || campo === null || typeof(campo) === 'undefined'){
            erro.push({
                messege: `O campo ${campoName} não pode ficar em branco.`
            }) 
         }
     
         if(option.min){
             if(campo.lenght < option.min){
                 erro.push({
                     messege: `O ${campoName} deve conter no minimo ${option.min} letras.`
                 })
             }
         }
     
         if(option.max){
             if(campo.lenght >= option.max){
                 erro.push({
                     messege: `O ${campoName} deve conter no maximo ${option.max} letras.`
                 })
             }
         }
     
     
    }

    return erro;



}