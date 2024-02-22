# 인증서 파일 경로 설정
cert_dir="$(pwd)/nginx/config/certificate"
cert_path="$cert_dir/hello-utils.pem"

# 인증서 디렉토리가 존재하는지 확인
check_certificate_directory() {
    if [ -d "$cert_dir" ]; then
        echo "✅ certificate 디렉토리가 존재합니다.\n"
    else
        echo "❌ certificate 디렉토리가 존재하지 않습니다.\n"
        echo "🛠️ certificate 디렉토리를 생성합니다.\n"
        mkdir "$cert_dir"
    fi
}

# 인증서 파일이 존재하는지 확인
check_certificate_files() {
    if [ -f "$cert_path" ]; then
        echo "✅ 인증서가 존재합니다.\n"
    else
        echo "❌ 인증서가 존재하지 않습니다.\n"
        install_mkcert
        generate_certificate
    fi
}

# 함수 정의: mkcert 설치
install_mkcert() {
    # mkcert가 설치되어 있는지 확인
    if ! which mkcert &> /dev/null; then
        echo "🛠️ mkcert를 설치합니다.\n"
        brew install mkcert
    fi
}

# mkcert로 인증서 발급
generate_certificate() {
    echo "📄 SSL certificate 생성합니다.\n"
    mkcert -install
    mkcert -key-file "$cert_dir/hello-utils-key.pem" -cert-file "$cert_dir/hello-utils.pem" "*.hello-utils.wiki"
}

# HTTPS 통신 가능 여부 확인
check_certificate_directory
check_certificate_files