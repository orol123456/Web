# 내맘대로 추가하는 Web Dictionary
-  ## 사용 언어
	- Node js

- ## 핵심 기능
	- 웹 페이지에서  원하는 title과 이 title에 관한 description을 저자와 함께 추가, 수정,삭제 할 수 있다.

- ## 사용법
    ![초기화면](/img/main.png)
    ### 메인 화면에서 요소를 추가하기위해 **click here** 을 누르면
    
    ![추가화면](/img/add.png)
    ### 원하는 title과 description author을 넣고 추가한다.

    ![성공화면](/img/success.png)
    ### 성공적으로 추가가 되었으면 success와 함께 메인화면으로 복귀하여 추가한 부분을 보여준다.
    ### 리스트의 목록중 하나의 title을 클릭하게되면 그 title에 해당하는 description,author이 같이 표시되고,
    ### 아래에 그 항목에 해당하는 edit(수정), delete(삭제) 버튼이 표시되게 된다.

    ![수정 전](/img/edit.png)
    ![수정 후](/img/edit_success.png)
    ### 글을 수정한 후, 확인을 누르면 위에서 보는바와 같이 수정된 결과가 반영된다.

    ![삭제](/img/delete.png)
    ### 글을 삭제한 후, 성공적으로 삭제된 모습을 볼 수 있다.

- ## 구현
    - Node js의 express모듈을 사용하여 전반적인 구현을 하였고 templete engine으로는 jade를 사용하였다.
    - mysql과 node를 node-mysql모듈을 사용하여 연동하였다.

- ## 한계
    - 확실한 이해를 바탕으로 만들지 않고 전반적인 흐름만 파악하고 만들었기 때문에 코드의 가독성과 효율성이 떨어지는 것 같다.

- ## 참고
    - [생활코딩 nodejs_mysql](https://www.inflearn.com/course/node-js-database/lecture/3584)
    

    


