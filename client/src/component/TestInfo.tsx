const TestInfo = ({ data }) => {
  return (
    <div>
      <div>
        <label>id</label>
        <input type="text" placeholder="id" disabled value={data.id} />
      </div>
      <div>
        <label>title</label>
        <input type="text" placeholder="title" value={data.title} />
      </div>
      <div>
        <label>description</label>
        <input type="text" placeholder="description" value={data.description} />
      </div>
    </div>
  );
};
export default TestInfo;
