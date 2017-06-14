import React from 'react';
import {Line} from 'rc-progress';
import {CircleMember} from './CircleMember';
import {calcPercent} from '../../lib/util';

export const MiniProjectCard = (props) => {
  return (
    <li className="allprojects-list__item">
      <div className="miniProjectCard">
        <h4 className="miniProjectCard__name">{props.project.projectName}</h4>
        <p className="miniProjectCard__notes">{props.project.notes}</p>
        <ul className="miniProjectCard__members">

            {
              props.project.members.map((memberId) => {
                return (
                  <li key={memberId} className="members__img">
                    <CircleMember memberId={memberId} /></li>);
              })
            }

        </ul>
        <h5 className="status">Status</h5>
        <Line
          percent={calcPercent(props.project.documents)}
          strokeWidth="2"
          strokeColor="#512DA8"
          trailWidth="2"
         />
      </div>
    </li>
  );
}
