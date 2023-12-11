export const transformTags = (text: any) => {

    // const attributeMatcher = /{>(\S+)(\s[^\s]+=[^\s]+)(\s[^\s]+=[^\s]+)?(\s[^\s]+=[^\s]+)?(\s[^\s]+=[^\s]+)?(\s[^\s]+=[^\s]+)?(\s[^\s]+=[^\s]+)?(\s[^\s]+=[^\s]+)?(\s[^\s]+=[^\s]+)?(\s[^\s]+=[^\s]+)?(\s[^\s]+=[^\s]+)?(\s[^\s]+=[^\s]+)?(\s[^\s]+=[^\s]+)?(\s[^\s]+=[^\s]+)?(\s[^\s]+=[^\s]+)?(\s[^\s]+=[^\s]+)?/g

    // const result = attributeMatcher.exec(text)?.filter(m => m !== null);
    // const tagType = result[1];
    

    // console.log(JSON.stringify(result, null, 2));
    // return text;

    const regex = /{>(\w+)\s*([^}]*)}/g;

    const htmlString = text.replace(regex, (_match: any, tagName: any, attributes: string) => {
      const attributeRegex = /(\w+)=([^ ]+)/g;
      let attributeString = '';
  
        const wrapInQuotes = (value: any) => {

            if (value.startsWith('"') && value.endsWith('"')) {
                return value;
            }
            return `"${value}"`;
        }

      attributes.replace(attributeRegex, (_match: any, attributeName: any, attributeValue: any) => {
        attributeString += ` ${attributeName}=${wrapInQuotes(attributeValue)}`;
        return '';
      });
  
      return `<${tagName}${attributeString} />`;
    });
  
    return htmlString;
}