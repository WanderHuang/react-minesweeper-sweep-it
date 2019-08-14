import React from 'react';
import { NumberColors } from '../../constant';
export default class CellFont extends React.Component {
  renderColorfulContent (content, level) {
    if (!level) {
      level = Number(content)
    }
    switch (level) {
      case 0:
        return NumberColors.MINE_0;
      case 1:
        return NumberColors.MINE_1;
      case 2:
        return NumberColors.MINE_2;
      case 3:
        return NumberColors.MINE_3;
      case 4:
        return NumberColors.MINE_4;
      case 5:
        return NumberColors.MINE_5;
      case 6:
        return NumberColors.MINE_6;
      case 7:
        return NumberColors.MINE_7;
      case 8:
        return NumberColors.MINE_8;
      default:
        return NumberColors.MINE_0;
    }
  }
  render () {
    const { content } = this.props;
    return (
      <span style={{color: this.renderColorfulContent(content), fontWeight: 500}}>
        { content }
      </span>
    )
  }
}