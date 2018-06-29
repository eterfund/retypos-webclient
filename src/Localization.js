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
        close:                      "Закрыть",
        saveChanges:                "Сохранить изменения"
    },
    en: {

    }
})