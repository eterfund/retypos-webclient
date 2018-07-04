import React, {Component} from 'react'
import {Thumbnail} from 'react-bootstrap'

import { i18n } from '../Localization';
import { config } from '../config';

import countryImages from './images';

import './styles.css'

class LangSwitcher extends Component {
    constructor(props, context) {
        super(props, context);

        this.languages = [];
        this.languages = props.languages;

        this.onLangChanged = props.onLangChanged;

        this.state = {
            activeLanguage: 0
        };
    }

    changeLanguage = index => {
        this.setState({ activeLanguage: index });
        this.onLangChanged(this.languages[index]);
    }

    render() {
        const thumbs = this.languages.map((element, index) => {
            if (index === this.state.activeLanguage) {
                return <Thumbnail key={index} className="lang-thumb active" 
                    src={countryImages[element]}
                    onClick={e => this.changeLanguage(index)}></Thumbnail>
            } else {
                return <Thumbnail key={index} className="lang-thumb" 
                    src={countryImages[element]}
                    onClick={e => this.changeLanguage(index)}></Thumbnail>
            }
        });

        return (
            <div className="lang-switcher">
                {thumbs}
            </div>
        );
    }
}

export default LangSwitcher;