import React from "react";
import { Select, SelectItem } from "native-base";

const TagFilter = ({ selectedTag, handleTagChange, tags }) => {
  return (
    <Select
      selectedValue={selectedTag}
      minWidth={200}
      placeholder="Filter by Tag"
      onValueChange={handleTagChange}
    >
      <Select.Item label="All" value="" />
      {tags.map(tag => (
        <Select.Item key={tag} label={tag} value={tag} />
      ))}
    </Select>
  );
};

export default TagFilter;