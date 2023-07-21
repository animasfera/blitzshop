import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar } from "@fortawesome/free-solid-svg-icons"

export const RatingStars = (props) => {
  let stars = [] as any
  for (var i = 1; i <= props.rating; i++) {
    stars.push(<FontAwesomeIcon style={{ marginRight: "2px" }} size="xs" icon={faStar} key={i} />)
  }
  return stars
}
