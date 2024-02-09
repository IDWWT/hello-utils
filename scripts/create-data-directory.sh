if [ -d "$(pwd)/mysql/data" ]; then
    echo "✅ data 디렉토리가 존재합니다."
else
    echo "❌ data 디렉토리가 존재하지 않습니다."
    echo "🛠️ data 디렉토리를 생성합니다."
    mkdir "$(pwd)/mysql/data"
fi