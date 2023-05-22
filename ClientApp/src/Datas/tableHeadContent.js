// tableHeadContent.js
export const tableHeadContentNewsletters = [
    { id: 0, name: "pages.patch_note.patch_note_id", value: "Id", width: "10%", isSortable: true },
    { id: 1, name: 'pages.newsletter.newsletter_title_fr', value: "Titre", width: "30%", isSortable: true },
    { id: 2, name: 'pages.newsletter.newsletter_date', value: "PublicationDate", width: "15%", isSortable: true },
    { id: 3, name: 'pages.newsletter.newsletter_date_update', value: "ModificationDate", width: "15%", isSortable: true },
    { id: 4, name: 'pages.newsletter.newsletter_number_articles', value: "NumberArticles", width: "10%", isSortable: false },
    { id: 5, name: 'pages.newsletter.newsletter_actions', value: "Action", width: "10%", isSortable: false },
];


export const tableHeadContentArticles = [
    { id: 0, name: "pages.patch_note.patch_note_id", value: "Id", width: "10%", isSortable: true },
    { id: 1, name: 'pages.patch_note.patch_note_date', value: "PublicationDate", width: "30%", isSortable: true },
    { id: 2, name: 'pages.patch_note.patch_note_date_update', value: "ModificationDate", width: "15%", isSortable: true },
    { id: 3, name: 'pages.patch_note.patch_note_title_article', value: "Titre", width: "15%", isSortable: false },
    { id: 4, name: 'pages.patch_note.patch_note_category', value: "NumberArticles", width: "10%", isSortable: false },
    { id: 5, name: 'pages.patch_note.patch_note_module', value: "Module", width: "10%", isSortable: false },
    { id: 6, name: 'pages.patch_note.patch_note_action', value: "Action", width: "10%", isSortable: false },
];

export const tableHeadContentCommits = [
    { id: 0, name: 'pages.commit.commit_author', value: "author", width: "10%", isSortable: false },
    { id: 1, name: 'pages.commit.commit_sha', value: "Titre", width: "10%", isSortable: false },
    { id: 2, name: 'pages.commit.commit_message', value: "message", width: "70%", isSortable: false },
    { id: 4, name: 'pages.commit.commit_date', value: "date", width: "10%", isSortable: false },
];