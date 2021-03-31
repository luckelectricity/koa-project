function renderBody(code= 200,data = {}, msg = 'success'){
  return {
    code,
    data,
    msg
  }
}

module.exports = {renderBody}