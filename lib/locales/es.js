module.exports =
{
    // parser errors:
    bad_expression_statement: 'Expresión inválida.',
    existing_name: 'El nombre "<%=name%>" ya está definido.',
    expected_but_found: 'Se esperaba "<%=expected%>" pero se encontró "<%=actual%>".',
    expecting_error_message: 'El comando BOOM espera como argumento un mensaje de error entre comillas.',
    expecting_final_quotes: 'Se esperaba un cierre de comillas.',
    expecting_function_name: 'Se esperaba un nombre de función',
    expecting_parameter_name: 'Se esperaba un nombre de parámetro.',
    expecting_procedure_name: 'Se esperaba un nombre de procedimiento',
    foreach_expects_an_identifier: 'El foreach espera un identificador sobre el cual iterar.',
    function_must_end_with_return: 'La función <%=name%> debe terminar con un return.',
    function_name_should_start_with_lowercase: 'El nombre de la función <%=name%> debe empezar con minúscula.',
    invalid_key: 'La rama número <%=n%> no contiene una tecla válida.',
    missing_operator: 'No se encontró el operador.',
    no_root_declaration: 'Se esperaba una definición de programa, función o procedimiento.',
    not_a_function_or_procedure: '<%=name%> no es una función o procedimiento.',
    not_defined: 'No definido.',
    only_identifiers_can_be_used_in_assignment: 'Del lado izquierdo de la asignación sólo pueden usarse identificadores.',
    place_init_at_the_start: 'La rama INIT debe ir al principio.',
    place_timeout_at_the_end: 'La rama TIMEOUT(n) debe ir al final.',
    procedure_name_should_start_with_uppercase: 'El nombre del procedimiento <%=name%> debe empezar con mayúscula.',
    reserved_name: 'El nombre "<%=name%>" no se puede usar porque es parte del lenguaje.',
    timeout_outside_bounds: 'El argumento de TIMEOUT(n) debe ser un número entre 1 y 60000.',
    unknown_operator: 'Operador desconocido.',
    unexpected_token: 'Token no esperado.',

    // interpreter errors:
    inconsistent_assignment: 'No se puede asignar a "<%=name%>" un valor de tipo "<%=actual%>" ya que es de tipo "<%=expected%>".',
    non_numeric_exit_code: 'El programa retornó un valor no numérico.',
    type_mismatch: 'Se esperaba un valor de tipo "<%=expected%>" pero se encontró uno de tipo "<%=actual%>".',
    undefined_procedure: 'El procedimiento "<%=name%>" no se encuentra definido.',
    undefined_function: 'La función "<%=name%>" no se encuentra definida.',
    undefined_literal: 'El literal "<%=name%>" no existe.',
    undefined_name: 'El nombre "<%=name%>" no existe.',
    wrong_arity: 'Se esperaban <%=expected%> argumentos pero se obtuvieron <%=actual%>.'
};
