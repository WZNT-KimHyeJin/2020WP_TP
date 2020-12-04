#include <iostream>
#include <fstream>
#include <vector>
#include <string>

using namespace std;
void fileRNP() {
	ifstream ifile;
	ifile.open("test_copy.txt");
	//ifile.open("a.txt");

	char* line;
	//string allText;
	int maxSize = 75;
	vector<string> vec; // 75바이트로 자른 문자열을 저장
	int lastSpace=0; // 엔터가 있을 경우 index 저장.

	line = new char[76]; // 출력할 한 줄
	if (ifile.is_open()) {
		cout << "파일이 존재합니다" << endl;
		int count = 0;
		int wordNumCheck = 0; // maxSize를 넘어가지 않게 체크

		while (!ifile.eof()) {


			ifile.get(line[wordNumCheck]);
			//getline(ifile, allText);
			wordNumCheck++;
			//cout << "추가된 값 : " << line[wo]

			if (line[wordNumCheck-1] == ' ') {
				lastSpace = wordNumCheck;
			}


			// 75byte를 시작할 때. 
			// index=74 == ' '  => continue
			/*
			1. 75바이트가 '' '라면 => countinue
			2. line[74] != ' ' && line[75] != ' '
			*/

			if (wordNumCheck == maxSize) { // wordNumCheck == 75
				char save;
				ifile.get(save); //line[75]

				if (line[maxSize - 1] == ' ') { // line의 마지막 ==' '
					line[maxSize] = '\0';
					vec.push_back(line);
					cout << count++ << " | " << line << endl;
					line = new char[75]; // 초기화
					line[0] = save; // 줄바꿈 이후에 가장 앞에 값 삽입.
					wordNumCheck = 1; // index 정비
					continue;
				}
				else if (save == ' ') {
					line[maxSize] = '\0';
					vec.push_back(line);
					cout << count++ << " | " << line << endl;
					line = new char[75]; // 배열 초기화
					wordNumCheck = 0;
					continue;
				}
				else {
					int saveSize = 75 - lastSpace; // 잘린 단어의 앞부분 길이
					char store[20];
					for (int i = lastSpace; i < 75; i++) {
						store[i-lastSpace] = line[i];
						//저장 테스트 용
						//cout << "store [" << i - lastSpace << "] : " << store[i] << endl;
					}
					store[saveSize] = '\0';
					line[lastSpace] = '\0';
					vec.push_back(line);
					cout << count++ << " | " << line << endl;
					line = new char[75];
					for (int i = 0; i < saveSize; i++) {
						line[i] = store[i];
					}
					wordNumCheck = saveSize;
					continue;

				}
				cout << wordNumCheck - 1 << "번째 lline 변경" << line << endl;

			}
			else {
				//cout << wordNumCheck << "번째 line 변경내용" << line << endl;
			}

		}
	}
	else {
		cout << "파일을 찾을 수 없습니다." << endl;
	}

	ifile.close();

}

int main() {
	fileRNP();
}
