export const Option = (props) => (
  <>
    {props.options[props.id].map((o) => (
      <div><input type="radio" value={o[0]} onChange={props.onChange} name={`${props.name}-${props.id + 1}`} />{o}</div>
    ))}
  </>
);
