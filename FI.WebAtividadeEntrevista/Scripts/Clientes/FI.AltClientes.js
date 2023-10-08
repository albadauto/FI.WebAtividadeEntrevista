
$(document).ready(function () {
    if (obj) {
        $('#formCadastro #Nome').val(obj.Nome);
        $('#formCadastro #CEP').val(obj.CEP);
        $('#formCadastro #Email').val(obj.Email);
        $('#formCadastro #Sobrenome').val(obj.Sobrenome);
        $('#formCadastro #Nacionalidade').val(obj.Nacionalidade);
        $('#formCadastro #Estado').val(obj.Estado);
        $('#formCadastro #Cidade').val(obj.Cidade);
        $('#formCadastro #Cpf').val(obj.CPF);
        $('#formCadastro #Logradouro').val(obj.Logradouro);
        $('#formCadastro #Telefone').val(obj.Telefone);
    }

    $('#formCadastro').submit(function (e) {
        e.preventDefault();
        
        $.ajax({
            url: urlPost,
            method: "POST",
            data: {
                "NOME": $(this).find("#Nome").val(),
                "CEP": $(this).find("#CEP").val(),
                "Email": $(this).find("#Email").val(),
                "Sobrenome": $(this).find("#Sobrenome").val(),
                "Nacionalidade": $(this).find("#Nacionalidade").val(),
                "Estado": $(this).find("#Estado").val(),
                "CPF": $(this).find("#Cpf").val(),
                "Cidade": $(this).find("#Cidade").val(),
                "Logradouro": $(this).find("#Logradouro").val(),
                "Telefone": $(this).find("#Telefone").val()
            },
            error:
            function (r) {
                if (r.status == 400)
                    ModalDialog("Ocorreu um erro", r.responseJSON);
                else if (r.status == 500)
                    ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
            },
            success:
                function (r) {
                ModalDialog("Sucesso!", r)
                $("#formCadastro")[0].reset();                                
                window.location.href = urlRetorno;
            }
        });
    })
    
})

function ModalDialog(titulo, texto) {
    var random = Math.random().toString().replace('.', '');
    var texto = '<div id="' + random + '" class="modal fade">                                                               ' +
        '        <div class="modal-dialog">                                                                                 ' +
        '            <div class="modal-content">                                                                            ' +
        '                <div class="modal-header">                                                                         ' +
        '                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>         ' +
        '                    <h4 class="modal-title">' + titulo + '</h4>                                                    ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-body">                                                                           ' +
        '                    <p>' + texto + '</p>                                                                           ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-footer">                                                                         ' +
        '                    <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>             ' +
        '                                                                                                                   ' +
        '                </div>                                                                                             ' +
        '            </div><!-- /.modal-content -->                                                                         ' +
        '  </div><!-- /.modal-dialog -->                                                                                    ' +
        '</div> <!-- /.modal -->                                                                                        ';

    $('body').append(texto);
    $('#' + random).modal('show');
}

function MascaraCPF() {
    var cpf = document.getElementById('Cpf');
    var valor = cpf.value.replace(/\D/g, '');

    if (valor.length <= 3) {
        cpf.value = valor;
    } else if (valor.length <= 6) {
        cpf.value = valor.slice(0, 3) + '.' + valor.slice(3);
    } else if (valor.length <= 9) {
        cpf.value = valor.slice(0, 3) + '.' + valor.slice(3, 6) + '.' + valor.slice(6);
    } else {
        cpf.value = valor.slice(0, 3) + '.' + valor.slice(3, 6) + '.' + valor.slice(6, 9) + '-' + valor.slice(9, 11);
    }
}

function verificaPrimeiroDigito(cpf) {
    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += cpf[i] * (10 - i);
    }
    const resto = (sum * 10) % 11;
    if (resto < 10) {
        return cpf[9] == resto;
    }
    return cpf[9] == 0;
}

function verificaSegundoDigito(cpf) {
    let sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += cpf[i] * (11 - i);
    }
    const resto = (sum * 10) % 11;
    if (resto < 10) {
        return cpf[10] == resto;
    }
    return cpf[10] == 0;
}

function verificaRepetido(cpf) {
    const primeiro = cpf[0];
    let diferente = false;
    for (let i = 1; i < cpf.length; i++) {
        if (cpf[i] != primeiro) {
            diferente = true;
        }
    }
    return diferente;
}


function verificaCpf(cpf) {
    var cpfLimpo = limparCpf(cpf)

    if (cpfLimpo.length != 11) {
        return false;
    }
    if (!verificaRepetido(cpfLimpo)) {
        return false;
    }
    if (!verificaPrimeiroDigito(cpfLimpo)) {
        return false;
    }
    if (!verificaSegundoDigito(cpfLimpo)) {
        return false;
    }
    return true;
}

function limparCpf(cpf) {
    return cpf.replace(/[.-]/g, '');
}

function validarCpf(cpf) {
    if (!verificaCpf(cpf)) {
        window.alert('O CPF digitado é invalido')
        document.getElementById('Cpf').value = ''
    }
}

