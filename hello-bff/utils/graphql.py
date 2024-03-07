import re

def get_root_field_name(string):
    # 중괄호의 시작과 끝 인덱스를 찾음
    start_index = string.find('{') + 1
    end_index = string.rfind('}') - 1
    
    # 중괄호가 없는 경우 빈 문자열 반환
    if start_index == -1 or end_index == -1:
        return None
    
    # 시작 중괄호 다음부터 끝 중괄호 이전까지의 부분 문자열을 반환
    root_field = string[start_index:end_index+1].strip()

    match = re.match(r'\b(\w+)\b', root_field)
    if match:
        return match.group(1)
    else:
        return None