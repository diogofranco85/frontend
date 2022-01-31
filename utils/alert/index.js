export const swal = (instance, text, type = 'success') => {

  const title = type === 'success' ? 'Sucesso !' : 'Erro'

  instance.$swal.fire({
    text,
    title,
    type
  })
}

export const toast = (instance, text, position = 'top-right') => {

  instance.$swal.fire({
    text,
    title: 'teste',
    toast: true,
    position,
  })
}
