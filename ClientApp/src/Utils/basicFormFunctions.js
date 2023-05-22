
export const openModal = (modal) =>{
    modal.onOpen();
}

export const closeModal = (modal) =>{
    modal.onClose();
}


export const resetFormMutation=(mutation, reset, modal)=>{
    mutation.reset();
    reset();
    modal.onClose();
}

export const resetForm=(reset, modal)=>{
    reset();
    modal.onClose();
}