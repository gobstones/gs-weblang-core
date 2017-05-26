var _ = require("lodash");

module.exports =
{
    // parser errors:
    bad_expression_statement: "Expresión inválida.",
    existing_procedure: "El procedimiento '<%=name%>' ya está definido.",
    existing_function: "La función '<%=name%>' ya está definida.",
    expected_but_found: "Se esperaba '<%=expected%>' pero se encontró '<%=actual%>'.",
    expecting_final_quotes: "Se encontraron comillas de apertura sin sus correspondientes comillas de cierre.",
    expecting_function_name: "Se esperaba un nombre de función",
    expecting_parameter_name: "Se esperaba un nombre de parámetro.",
    expecting_procedure_name: "Se esperaba un nombre de procedimiento.",
    function_must_end_with_return: "La función '<%=name%>' debe terminar con un return.",
    function_name_should_start_with_lowercase: "El nombre de la función '<%=name%>' debe empezar con minúscula.",
    infinite_loop: function(detail) {
        var s = detail.timeout === 1 ? '' : 's';
        return "Se detectó un bucle infinito luego de esperar " + detail.timeout + " segundo" + s + ".";
    },
    invalid_key: "'<%=key%>' no es un identificador de tecla válido.",
    invalid_name: function(detail) {
        var nameType = detail.nameType;
        var parameters = _.assign({
            subject: nameType === 'parameter' ? 'un parámetro' : (nameType === 'index' ? 'un índice' : 'una variable')
        }, detail);

        return _.template("<%=value%> no es un nombre válido para <%=subject%>.")(parameters);
    },
    no_root_declaration: "Se esperaba una definición de programa, función o procedimiento.",
    not_a_function_or_procedure: "<%=name%> no es una función o procedimiento.",
    place_init_at_the_start: "El bloque INIT debe estar al comienzo del programa interactivo.",
    place_timeout_at_the_end: "El bloque TIMEOUT debe estar al final del programa interactivo.",
    procedure_name_should_start_with_uppercase: "El nombre del procedimiento '<%=name%>' debe empezar con mayúscula.",
    reserved_name: "El nombre '<%=name%>' no se puede usar porque es parte del lenguaje.",
    timeout_outside_bounds: "El argumento de TIMEOUT debe ser un número entre 1 y 60000.",
    unexpected_token: "El símbolo '<%=token%>' no forma parte del lenguaje.",

    // interpreter errors:
    inconsistent_assignment: "La variable '<%=name%>' contenía un valor de tipo '<%=actual%>' y se intentó asignar un valor de tipo '<%=expected%>'.",
    call_type_mismatch: "El argumento de '<%=name%>' debería ser un valor de tipo '<%=expected%>' pero se encontró uno de tipo '<%=actual%>'.",
    strings_only_allowed_in_boom: "Solo se pueden usar comillas en el procedimiento BOOM.",
    type_mismatch: "Se esperaba un valor de tipo '<%=expected%>' pero se encontró uno de tipo '<%=actual%>'.",
    undefined_procedure: "El procedimiento '<%=name%>' no se encuentra definido.",
    undefined_function: "La función '<%=name%>' no se encuentra definida.",
    undefined_literal: "La expresión literal '<%=name%>' no existe.",
    undefined_name: "El nombre '<%=name%>' no está definido.",
    wrong_arity: function(detail) {
        var parameters = _.assign({
            subject: detail.nameType === 'procedure' ? 'El procedimiento' : 'La función',
            arguments: detail.expected !== 1 ? 'argumentos' : 'argumento',
            found: detail.actual !== 1 ? 'encontraron' : 'encontró'
        }, detail);

        return _.template("<%=subject%> <%=name%> esperaba <%=expected%> <%=arguments%> y se <%=found%> <%=actual%>.")(parameters);
    },

    // unknown errors (yet):
    not_defined: "Esto no se puede hacer.",
    missing_operator: "Esto no se puede hacer (falta un operador).",
    unknown_operator: "Esto no se puede hacer (operador desconocido)."
};
