import LocalizedStrings from 'react-localization'

export const i18n = new LocalizedStrings({
    ru: {
        modalTitle:                 "Система исправления опечаток Etersoft",
        modalInfo:                  "Пожалуйста, введите исправленный вариант и комментарий (необязательно) " +
                                    "для отправки отчёта об опечатке на сервер",
        modalCorrectLabel:          "Исправленный вариант",
        modalCorrectHelp:           "Модераторы проверят исправления и внесут поправки в текст",
        modalTypoLabel:             "Текст с ошибкой",
        modalCommentPlaceholder:    `Например, "опечатка"`,
        modalCommentLabel:          "Пояснения к исправлению",
        errorSelectionLength:       "Опечатка должна быть длиной от {0} до {1} символов",  
        errorCorrectLength:         "Исправление должно быть длиной от {0} до {1} символов",
        errorDoesNotDistinct:       "Исправленный вариант идентичен исходному",
        errorTooOften:              "Вы отправляете исправления слишком часто",
        close:                      "Закрыть",
        saveChanges:                "Сохранить изменения",
        messageSuccess:             "Благодарим за отправку опечатки. Мы уже работаем над её исправлением!",
        errorFormContainsErrors:    "Форма отправки содержит ошибки!",
        errorSendFailture:          "Не удалось отправить исправление. Мы уже работаем над решением проблемы!",
    },
    en: {
        modalTitle:                 "Typo correction system Etersoft",
        modalInfo:                  "Please, type in a correct variant to the input field bellow and optional commentary. Than press the send button " +
                                    "to send the correction to the server.",
        modalCorrectLabel:          "Corrected text",
        modalCorrectHelp:           "Moderators will check your proposal corretion and fix it!",
        modalTypoLabel:             "The typo",
        modalCommentPlaceholder:    `"A typo", for example`,
        modalCommentLabel:          "Commentary",
        errorSelectionLength:       "The text length must be in range ({0}-{1})",  
        errorCorrectLength:         "The corrected text length must be in range ({0}-{1})",
        errorDoesNotDistinct:       "The original and corrected text are the same",
        errorTooOften:              "You are sending correction requests too often",
        close:                      "Close",
        saveChanges:                "Save changes",
        messageSuccess:             "Thank you for a typo submitting! We are already working on this report!",
        errorFormContainsErrors:    "The form contains errors!",
        errorSendFailture:          "Failed to send request. We are fixing a problem!",
    }
})