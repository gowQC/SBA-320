import questionMark from "../images/question-mark.jpg";

export default function Teammate({ teammateData }) {
  return (
    <>
      <div className="teammate">
        <img
          className="teammatePortrait"
          src={teammateData.charUrl || questionMark}
          alt=""
          height="256px"
          width="256px"
        />
        <img
          className="teammateWeapon"
          src={teammateData.weaponUrl || questionMark}
          alt=""
          height="128px"
          width="128px"
        />
        <img
          className="teammateArtifact1"
          src={teammateData.firstArtifactUrl || questionMark}
          alt=""
          height="180px"
          width="180px"
        />
        {teammateData.secondArtifactUrl === undefined ? (
          <img
            className="teammateArtifact2"
            src={questionMark}
            alt=""
            height="180px"
            width="180px"
          />
        ) : (
          <img
            className="teammateArtifact2"
            src={teammateData.secondArtifactUrl}
            alt=""
            height="180px"
            width="180px"
          />
        )}
      </div>
    </>
  );
}
