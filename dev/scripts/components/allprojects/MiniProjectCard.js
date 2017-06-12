import React from 'react';
import {Line} from 'rc-progress';
import {CircleMember} from './CircleMember';
import {calcPercent} from '../../lib/util';

export const MiniProjectCard = (props) => {
  return (
    <li className="allprojects-list__item">
      <div className="miniProjectCard">
        <h2 className="miniProjectCard__name">{props.project.projectName}</h2>
        <p className="miniProjectCard__notes">{props.project.notes}</p>
        <ul className="miniProjectCard__members">
          <li className="members__img">
            {
              props.project.members.map((memberId) => {
                return <CircleMember
                          key={memberId}
                          memberId={memberId} />
              })
            }
          </li>
        </ul>
        <Line percent={calcPercent(props.project.documents)} strokeWidth="4" strokeColor="#D3D3D3" />
      </div>
    </li>
  );
}
