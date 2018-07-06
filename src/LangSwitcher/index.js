import React, {Component} from 'react';
import Thumbnail from 'react-bootstrap/lib';

import countryImages from './images';

import './styles.css'

class LangSwitcher extends Component {
    constructor(props, context) {
        super(props, context);

        this.languages = [];
        this.languages = props.languages;

        this.onLangChanged = props.onLangChanged;

        this.state = {
            activeLanguage: this.props.activeLanguage || this.languages[0]
        };
    }

    changeLanguage = element => {
        this.setState({ activeLanguage: element });
        this.onLangChanged(element);
    }

    render() {
        const thumbs = this.languages.map((element, index) => {
            if (element === this.state.activeLanguage) {
                return <Thumbnail key={index} className="lang-thumb active" 
                    src={countryImages[element]}
                    onClick={e => this.changeLanguage(element)}></Thumbnail>
            } else {
                return <Thumbnail key={index} className="lang-thumb" 
                    src={countryImages[element]}
                    onClick={e => this.changeLanguage(element)}></Thumbnail>
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