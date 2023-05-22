import {useToast} from '@chakra-ui/react'

export const createSuccessToast = (title) => {
    return useToast({
        position: 'bottom-right',
        variant: 'subtle',
        duration: 2000,
        title: title,
        status: 'success',
        isClosable: true,
        containerStyle: {
            maxWidth: '100%',
        },
    })
}

export const createErrorToast = (title) => {
    return useToast({
        position: 'bottom-right',
        variant: 'subtle',
        duration: 2000,
        title: title,
        status: 'error',
        isClosable: true,
        containerStyle: {
            maxWidth: '100%',
        },
    })
}