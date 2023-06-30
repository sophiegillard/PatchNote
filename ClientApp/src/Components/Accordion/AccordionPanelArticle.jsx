import {
    AccordionPanel,
    Checkbox,
    Container, Stack, CheckboxGroup, Text, HStack, Button, IconButton,
} from "@chakra-ui/react";
import React from "react";
import {useParams} from "react-router-dom";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {getArticleNewsletterId} from "@/services/articles/getArticlesQueries.js";
import {updateArticleNewsletterIdById} from "@/services/articles/updateArticleById.js";
import {
    MdOutlineAddCircleOutline,
    MdOutlineRemoveCircleOutline,
} from "react-icons/all.js";

export const AccordionPanelArticle = ({listArticles, refetch}) => {
    const {id} = useParams();

    const {data} = useQuery(
        ['articleNewsletterId'],
        () => getArticleNewsletterId()
    );

    const queryClient = useQueryClient()

    //Update the articles of the newsletter
    const mutation = useMutation({
        mutationFn: updateArticleNewsletterIdById,
        onSuccess: (post) => {
            queryClient.invalidateQueries(["individualNewsletter", id])
            refetch();
            console.log("newsletterId updated")
        },
        onError: () => {
            console.log("error")
        }
    })


    const addArticleToNewsletter = async (articleId) => {
        await mutation.mutateAsync({id: articleId, newsletterId: id})
    }

    const removeArticleToNewsletter = async (articleId) => {
        await mutation.mutateAsync({id: articleId, newsletterId: null})
    }


    return <>
        <AccordionPanel pb={4}>
            <Container maxH="300px" overflowY="scroll">
                <Stack mt={1} spacing={1} overflow="hidden" gap={3}>
                    {listArticles.map((item, index) => (
                        <HStack
                            _hover={{fontWeight: "bold"}}>
                            <HStack width="100%">
                                <Text>{item.id} | {item.titreFR} </Text>
                                <Text>{item.datePublicationShort}</Text>
                            </HStack>
                            {item.newsletterId == id ?
                                (<IconButton
                                    spacing={3}
                                    isRound
                                    size='xs'
                                    onClick={() => removeArticleToNewsletter(item.id)}
                                    radius='full'
                                    colorScheme='tercaryPink'
                                    aria-label='Call Sage'
                                    fontSize='20px'
                                    icon={<MdOutlineRemoveCircleOutline size="25px"/>}
                                />)
                                :
                                (<IconButton
                                    isRound
                                    size='xs'
                                    onClick={() => addArticleToNewsletter(item.id)}
                                    radius='full'
                                    colorScheme='successButton'
                                    aria-label='Call Sage'
                                    fontSize='20px'
                                    icon={<MdOutlineAddCircleOutline size="25px"/>}
                                />)}
                        </HStack>
                    ))}
                </Stack>
            </Container>
        </AccordionPanel>
    </>
}
