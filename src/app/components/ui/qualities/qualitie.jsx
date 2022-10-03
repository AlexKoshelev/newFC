import React from "react";
import PropTypes from "prop-types";
import { useQualities } from "../../../hooks/useQuality";

const Qualitie = ({ id }) => {
  const { getQuality } = useQualities();
  const { color, name } = getQuality(id);
  const { isLoading } = useQualities();
  if (isLoading) return "Loading...";
  return <span className={"badge m-1 bg-" + color}>{name}</span>;
};
Qualitie.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Qualitie;
