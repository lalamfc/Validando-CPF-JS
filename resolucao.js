function ValidaCPF(cpfEnviado){
    Object.defineProperty(this, 'cpfLimpo', {
        get: function(){
            return cpfEnviado.replace(/\D+/g, '');
        }
    })
}

ValidaCPF.prototype.valida = function (){
    if(typeof this.cpfLimpo === 'undefined'){
        return false;
    }
    if (this.cpfLimpo.length !== 11) {
        return false;
    }
    if (this.isSequencia()) return false;
    //vai fatiar o array
    const cpfParcial = this.cpfLimpo.slice(0,-2);
    const digito1 = this.criaDigito(cpfParcial);
    const digito2 = this.criaDigito(cpfParcial + digito1);
    
    //comparar o cpf digitado com o que criamos p ver se é igual
    const novoCpf = cpfParcial + digito1 + digito2;
    console.log(novoCpf);

    return novoCpf === this.cpfLimpo;
};

//tranforma o cpf em array
ValidaCPF.prototype.criaDigito = function (cpfParcial){
    const cpfArray = Array.from(cpfParcial);
    
    let contadorRegressivo = cpfArray.length + 1;
    let total = cpfArray.reduce((ac, valor) =>{
        console.log(contadorRegressivo, valor, contadorRegressivo * valor);
        ac += (contadorRegressivo * Number(valor));
        contadorRegressivo--;
        return ac;
    }, 0);

    const digito = 11 - (total % 11);
    return digito > 9 ? '0' : String(digito);
}; 

ValidaCPF.prototype.isSequencia = function(){
    const sequencia =  this.cpfLimpo[0].repeat(this.cpfLimpo.length);
    return sequencia === this.cpfLimpo;
};


const cpf = new ValidaCPF('705.484.450-52');

if (cpf.valida()) {
    console.log('CPF VÁLIDO!');
} else {
    console.log('CPF INVÁLIDO!');
};